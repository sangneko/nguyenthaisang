document.addEventListener('DOMContentLoaded', async () => {
    // --- Cấu hình Supabase ---
    // THAY THẾ CÁC GIÁ TRỊ NÀY VỚI THÔNG TIN DỰ ÁN CỦA BẠN TỪ SUPABASE DASHBOARD -> SETTINGS -> API
    const SUPABASE_URL = 'https://ucsxzcxnjtqijqizyskd.supabase.co'; // Ví dụ: 'https://abcdefg1234.supabase.co'
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjc3h6Y3huanRxaWpxaXp5c2tkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMTIxMTAsImV4cCI6MjA2OTY4ODExMH0.8UcwzE9M0PEgBfGfToU1tdcCYCX69MfofXZ5p6Ql7DQ'; // Ví dụ: 'eyJhbGciOiJIUzI1Ni...'

    // Khởi tạo Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // --- Biến và Elements ---
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const usernameRegisterInput = document.getElementById('username-register');
    const signupButton = document.getElementById('signup-button');
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const currentUsernameSpan = document.getElementById('current-username');
    const authForm = document.getElementById('auth-form');
    const userInfo = document.getElementById('user-info');
    const gameSection = document.getElementById('game-section');
    const clickCountSpan = document.getElementById('click-count');
    const clickButton = document.getElementById('click-button');
    const saveScoreButton = document.getElementById('save-score-button');
    const resetButton = document.getElementById('reset-button');
    const scoreboardList = document.getElementById('scoreboard-list');

    let clickCount = 0;
    let currentUserId = null; // Supabase user ID
    let currentLoggedInUsername = null; // Tên hiển thị từ bảng 'users'

    // --- Chức năng Kiểm tra trạng thái đăng nhập ---
    async function checkUserSession() {
        const { data: { user } } = await supabase.auth.getUser(); // Lấy thông tin user hiện tại
        if (user) {
            currentUserId = user.id;
            await getAndSetUsername(user.id); // Lấy tên hiển thị từ bảng users
            showLoggedInState();
            await loadClickCountForUser(); // Tải điểm đã lưu của người dùng
        } else {
            showLoggedOutState();
        }
        await loadScoreboard(); // Luôn tải bảng xếp hạng khi khởi động/thay đổi trạng thái
    }

    async function getAndSetUsername(userId) {
        const { data, error } = await supabase
            .from('users')
            .select('username')
            .eq('id', userId)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 là lỗi không tìm thấy bản ghi
            console.error('Error fetching username:', error.message);
            currentLoggedInUsername = 'Người dùng ẩn danh'; // fallback
        } else if (data) {
            currentLoggedInUsername = data.username;
        } else {
            currentLoggedInUsername = 'Người dùng mới'; // Trường hợp user tồn tại nhưng chưa có entry trong bảng users (hiếm khi xảy ra với code upsert)
        }
        currentUsernameSpan.textContent = currentLoggedInUsername;
    }

    function showLoggedInState() {
        authForm.style.display = 'none';
        userInfo.style.display = 'block';
        gameSection.style.display = 'block';
    }

    function showLoggedOutState() {
        authForm.style.display = 'block';
        userInfo.style.display = 'none';
        gameSection.style.display = 'none';
        currentUserId = null;
        currentLoggedInUsername = null;
        clickCount = 0;
        clickCountSpan.textContent = clickCount;
    }

    // --- Chức năng Đăng ký / Đăng nhập / Đăng xuất ---
    async function signUp() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const username = usernameRegisterInput.value.trim();

        if (!email || !password || !username) {
            alert('Vui lòng điền đầy đủ Email, Mật khẩu và Tên hiển thị để đăng ký!');
            return;
        }

        const { data, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (authError) {
            alert(`Đăng ký thất bại: ${authError.message}`);
            return;
        }

        if (data.user) {
            // Người dùng đã được tạo thành công trong Supabase Auth.
            // Bây giờ, chèn tên người dùng vào bảng 'users' tùy chỉnh.
            // Sử dụng .upsert() để tránh lỗi trùng lặp khóa chính.
            const { error: insertUserError } = await supabase
                .from('users')
                .upsert({ id: data.user.id, username: username });

            if (insertUserError) {
                // Lỗi 23505 là lỗi khóa trùng lặp (duplicate key).
                // Nếu là lỗi này, có thể hồ sơ đã tồn tại, ta có thể bỏ qua hoặc cảnh báo.
                if (insertUserError.code === '23505' && insertUserError.message.includes('users_pkey')) {
                    console.warn('Hồ sơ người dùng đã tồn tại trong bảng "users", tiếp tục...');
                } else {
                    console.error('Lỗi khi lưu tên hiển thị vào bảng users:', insertUserError.message);
                    alert('Đăng ký thành công tài khoản, nhưng không thể lưu tên hiển thị. Vui lòng thử lại hoặc liên hệ hỗ trợ.');
                    return;
                }
            }
            
            alert('Đăng ký thành công! Vui lòng kiểm tra email để xác minh tài khoản (nếu bạn bật xác minh email trong Supabase).');
            
            // Tự động đăng nhập sau khi đăng ký thành công
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if (signInError) {
                alert(`Lỗi đăng nhập tự động sau đăng ký: ${signInError.message}`);
                showLoggedOutState();
            } else {
                await checkUserSession(); // Cập nhật UI và tải dữ liệu
            }
        }
    }

    async function signIn() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert('Vui lòng nhập Email và Mật khẩu để đăng nhập!');
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            alert(`Đăng nhập thất bại: ${error.message}`);
        } else if (data.user) {
            await checkUserSession(); // Cập nhật UI và tải dữ liệu
            alert(`Chào mừng, ${currentLoggedInUsername}!`);
        }
    }

    async function signOut() {
        if (confirm('Bạn có chắc muốn đăng xuất?')) {
            const { error } = await supabase.auth.signOut();
            if (error) {
                alert(`Đăng xuất thất bại: ${error.message}`);
            } else {
                showLoggedOutState();
                alert('Bạn đã đăng xuất.');
            }
        }
    }

    // --- Chức năng Game Đếm số ---
    function incrementClick() {
        if (!currentUserId) {
            alert('Vui lòng đăng nhập để chơi!');
            return;
        }
        clickCount++;
        clickCountSpan.textContent = clickCount;
    }

    async function saveScore() {
        if (!currentUserId) {
            alert('Vui lòng đăng nhập để lưu điểm!');
            return;
        }

        // Upsert điểm số: cập nhật nếu đã có, chèn nếu chưa có
        // Đảm bảo chỉ lưu điểm cao nhất
        const { data: existingScore, error: fetchError } = await supabase
            .from('scores')
            .select('score')
            .eq('user_id', currentUserId)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 là lỗi không tìm thấy bản ghi
            console.error('Lỗi khi kiểm tra điểm:', fetchError.message);
            alert('Không thể kiểm tra điểm hiện tại của bạn. Vui lòng thử lại.');
            return;
        }

        if (existingScore) {
            // Nếu đã có điểm, chỉ cập nhật nếu điểm hiện tại cao hơn
            if (clickCount > existingScore.score) {
                const { error: updateError } = await supabase
                    .from('scores')
                    .update({ score: clickCount })
                    .eq('user_id', currentUserId);

                if (updateError) {
                    console.error('Lỗi khi cập nhật điểm:', updateError.message);
                    alert('Không thể cập nhật điểm. Vui lòng thử lại.');
                } else {
                    alert('Điểm của bạn đã được cập nhật thành công!');
                    await loadScoreboard(); // Cập nhật bảng xếp hạng
                }
            } else {
                alert('Điểm hiện tại của bạn không cao hơn điểm đã lưu.');
            }
        } else {
            // Nếu chưa có điểm, thêm mới
            const { error: insertError } = await supabase
                .from('scores')
                .insert({ user_id: currentUserId, score: clickCount });

            if (insertError) {
                console.error('Lỗi khi lưu điểm mới:', insertError.message);
                alert('Không thể lưu điểm mới. Vui lòng thử lại.');
            } else {
                alert('Điểm của bạn đã được lưu thành công!');
                await loadScoreboard(); // Cập nhật bảng xếp hạng
            }
        }
    }

    // Tải điểm hiện tại của người dùng từ Supabase khi đăng nhập
    async function loadClickCountForUser() {
        if (!currentUserId) return;

        const { data, error } = await supabase
            .from('scores')
            .select('score')
            .eq('user_id', currentUserId)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error('Error loading user score:', error.message);
            clickCount = 0; // Đặt về 0 nếu có lỗi khác
        } else if (data) {
            clickCount = data.score;
        } else {
            clickCount = 0; // Nếu chưa có điểm, đặt về 0
        }
        clickCountSpan.textContent = clickCount;
    }

    function resetClick() {
        if (!currentUserId) {
            alert('Vui lòng đăng nhập để thực hiện thao tác này!');
            return;
        }
        if (confirm('Bạn có chắc muốn đặt lại điểm số hiện tại về 0?')) {
            clickCount = 0;
            clickCountSpan.textContent = clickCount;
            // Không tự động lưu về 0, người dùng cần bấm "Lưu điểm" để lưu thay đổi
            alert('Điểm của bạn đã được đặt lại về 0. Bấm "Lưu điểm" để cập nhật lên bảng xếp hạng.');
        }
    }

    // --- Bảng Xếp Hạng Thực sự từ Supabase ---
    async function loadScoreboard() {
        scoreboardList.innerHTML = '<li>Đang tải bảng xếp hạng...</li>';

        // Lấy top 10 điểm cao nhất, join với bảng users để lấy tên hiển thị
        const { data, error } = await supabase
            .from('scores')
            .select('score, users(username)') // Chọn score và username từ bảng users liên kết
            .order('score', { ascending: false }) // Sắp xếp giảm dần theo điểm
            .limit(10); // Lấy 10 người đứng đầu

        if (error) {
            console.error('Lỗi khi tải bảng xếp hạng:', error.message);
            scoreboardList.innerHTML = '<li>Không thể tải bảng xếp hạng.</li>';
            return;
        }

        if (data.length === 0) {
            scoreboardList.innerHTML = '<li>Chưa có điểm nào trên bảng xếp hạng.</li>';
        } else {
            scoreboardList.innerHTML = ''; // Xóa các mục cũ
            data.forEach((item, index) => {
                const li = document.createElement('li');
                // Kiểm tra xem item.users có tồn tại không trước khi truy cập username
                const username = item.users ? item.users.username : 'Người dùng ẩn danh'; 
                li.innerHTML = `<span>${index + 1}. ${username}:</span> <span>${item.score} điểm</span>`;
                scoreboardList.appendChild(li);
            });
        }
    }

    // --- Gán sự kiện ---
    signupButton.addEventListener('click', signUp);
    loginButton.addEventListener('click', signIn);
    logoutButton.addEventListener('click', signOut);
    clickButton.addEventListener('click', incrementClick);
    saveScoreButton.addEventListener('click', saveScore);
    resetButton.addEventListener('click', resetClick);

    // Kiểm tra trạng thái đăng nhập khi trang được nạp lần đầu
    checkUserSession();
});

// Hàm tạo client Supabase, cần thiết vì script được tải từ CDN
function createClient(supabaseUrl, supabaseKey) {
    const { createClient } = supabase; // Supabase JS SDK v2 export createClient globally
    return createClient(supabaseUrl, supabaseKey);
}
