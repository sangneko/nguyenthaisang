from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import random, time

def auto_fill_form():
    chrome_path = "PATH/TO/chromedriver"  # Đường dẫn thực tế
    service = Service(chrome_path)
    driver = webdriver.Chrome(service=service)

    form_url = "https://docs.google.com/forms/d/e/1FAIpQLSc7jifY5m7JVNsKEDe20foErjIqIVUMQ0ssOn6uwzTGd7i28w/viewform"
    driver.get(form_url)
    time.sleep(2)

    ## --- PHẦN 1 ---
    age_options = ["Dưới 18", "18 – 30", "31 – 45", "46 – 60", "Trên 60"]
    location_options = ["Thành phố Hồ Chí Minh", "Nơi Khác"]

    driver.find_element(By.XPATH, f'//div[@data-value="{random.choice(age_options)}"]').click()
    driver.find_element(By.XPATH, f'//div[@data-value="{random.choice(location_options)}"]').click()

    driver.find_element(By.XPATH, '//span[text()="Tiếp"]').click()
    time.sleep(1)

    ## --- PHẦN 2 ---
    quality_judgment = random.choice(["Có", "Không", "Không chắc chắn"])
    level = random.choice(["Nghiêm trọng", "Trung bình", "Ít", "Không có"])
    effects = ["Khó thở", "Dị ứng/mắt cay", "Mệt mỏi", "Không ảnh hưởng"]

    driver.find_element(By.XPATH, f'//div[@data-value="{quality_judgment}"]').click()
    driver.find_element(By.XPATH, f'//div[@data-value="{level}"]').click()

    for effect in random.sample(effects, k=random.randint(1, len(effects))):
        driver.find_element(By.XPATH, f'//div[contains(text(), "{effect}")]').click()

    driver.find_element(By.XPATH, '//span[text()="Tiếp"]').click()
    time.sleep(1)

    ## --- PHẦN 3 ---
    solutions = [
        "Cung cấp thông tin cảnh báo không khí hằng ngày",
        "Cây xanh đô thị",
        "Sử dụng thiết bị lọc không khí cá nhân",
        "Ứng dụng công nghệ hỗ trợ theo dõi không khí"
    ]
    tech_use = random.choice(["Có", "Không", "Tùy giá cả"])
    price_range = random.choice([
        "Dưới 50.000đ", "50.000 – 100.000đ", "100.000 – 200.000đ", "Trên 200.000đ", "Không sẵn sàng chi trả"
    ])

    for s in random.sample(solutions, k=random.randint(1, len(solutions))):
        driver.find_element(By.XPATH, f'//div[contains(text(), "{s}")]').click()

    driver.find_element(By.XPATH, f'//div[@data-value="{tech_use}"]').click()
    driver.find_element(By.XPATH, f'//div[@data-value="{price_range}"]').click()

    driver.find_element(By.XPATH, '//span[text()="Gửi"]').click()
    time.sleep(3)
    driver.quit()
