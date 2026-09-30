const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const saveBtn = document.getElementById('saveBtn');
const passwordInput = document.getElementById('password');

const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "@#$%^&*!?";

// تولید پسورد
function generatePassword() {
    let charset = "";
    if (uppercaseCheckbox.checked) charset += UPPERCASE;
    if (lowercaseCheckbox.checked) charset += LOWERCASE;
    if (numbersCheckbox.checked) charset += NUMBERS;
    if (symbolsCheckbox.checked) charset += SYMBOLS;

    if (!charset) {
        showPopup("حداقل باید یکی از گزینه‌ها روشن باشد");
        return ""; // اگر هیچ گزینه‌ای انتخاب نشده باشد، پسورد تولید نشود
    }

    let length = parseInt(lengthInput.value);
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

// رویدادها
generateBtn.addEventListener('click', () => {
    const pwd = generatePassword();
    passwordInput.value = pwd;
});

// ذخیره در localStorage و رفتن به صفحه saved.html
saveBtn.addEventListener('click', () => {
    if (!passwordInput.value) return;
    let saved = JSON.parse(localStorage.getItem('savedPasswords') || '[]');
    saved.push(passwordInput.value);
    localStorage.setItem('savedPasswords', JSON.stringify(saved));

    // بعد از ذخیره، کاربر را به صفحه نمایش پسوردها هدایت می‌کنیم
    window.location.href = "savemenu.html";
});

const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');

increaseBtn.addEventListener('click', () => {
    let val = parseInt(lengthInput.value);
    if (val < parseInt(lengthInput.max)) lengthInput.value = val + 1;
});

decreaseBtn.addEventListener('click', () => {
    let val = parseInt(lengthInput.value);
    if (val > parseInt(lengthInput.min)) lengthInput.value = val - 1;
});

// متغیرهای مربوط به چک‌باکس‌ها
const maxSecure = document.getElementById('maxSecure');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');

// رویداد تغییر وضعیت تیک امن‌ترین حالت
maxSecure.addEventListener('change', () => {
    if (maxSecure.checked) {
        // اگر امن‌ترین حالت فعال شد، همه چک‌باکس‌ها فعال می‌شوند
        uppercase.checked = true;
        lowercase.checked = true;
        numbers.checked = true;
        symbols.checked = true;

        // تغییر طول پسورد به 12
        lengthInput.value = 12;
    } else {
        // اگر تیک برداشته شد، طول پسورد به 8 تغییر می‌کند
        lengthInput.value = 8;

        // غیرفعال کردن همه چک‌باکس‌ها
        uppercase.checked = false;
        lowercase.checked = false;
        numbers.checked = false;
        symbols.checked = false;
    }
});

// برای جلوگیری از تیک خوردن امن‌ترین حالت وقتی که بقیه تیک‌ها برداشته شوند
const checkboxes = [uppercase, lowercase, numbers, symbols];
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        // وقتی چک‌باکس تغییر کرد، وضعیت امن‌ترین حالت رو بررسی می‌کنیم
        checkMaxSecureState();
    });
});

// تابع برای بررسی اینکه آیا باید تیک امن‌ترین حالت رو برداریم یا نه
function checkMaxSecureState() {
    // اگر هر کدام از چک‌باکس‌ها غیر فعال باشد، تیک امن‌ترین حالت برداشته می‌شود
    if (!uppercase.checked || !lowercase.checked || !numbers.checked || !symbols.checked) {
        maxSecure.checked = false;
        document.getElementById('length').value = 8; // طول پسورد به 8 تغییر می‌کند
    }
}

// نمایش پاپ‌آپ با پیامی خاص
function showPopup(message) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerText = message;
    document.body.appendChild(popup);
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);

    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 500);
    }, 3000);
}

const copyPopup = document.getElementById('copyPopup');

copyBtn.addEventListener('click', () => {
    if (!passwordInput.value) return;

    navigator.clipboard.writeText(passwordInput.value)
        .then(() => {
            // نمایش پاپ‌آپ
            copyPopup.classList.add('show');

            // بعد از 2 ثانیه پاپ‌آپ محو شود
            setTimeout(() => {
                copyPopup.classList.remove('show');
            }, 2000);
        })
        .catch(err => console.error(err));
});
// رویداد تغییر وضعیت سوئیچ امن‌ترین حالت
maxSecure.addEventListener('change', () => {
    if (maxSecure.checked) {
        // اگر امن‌ترین حالت فعال شد، همه چک‌باکس‌ها فعال می‌شوند
        uppercase.checked = true;
        lowercase.checked = true;
        numbers.checked = true;
        symbols.checked = true;

        // تغییر طول پسورد به 12
        lengthInput.value = 12;
    } else {
        // اگر تیک برداشته شد، طول پسورد به 8 تغییر می‌کند
        lengthInput.value = 8;

        // غیرفعال کردن همه چک‌باکس‌ها
        uppercase.checked = false;
        lowercase.checked = false;
        numbers.checked = false;
        symbols.checked = false;
    }
});
// فعال کردن "امن‌ترین حالت" به طور پیش‌فرض و تیک زدن همه چک‌باکس‌ها
window.addEventListener('DOMContentLoaded', () => {
    maxSecure.checked = true; // فعال کردن "امن‌ترین حالت"
    uppercase.checked = true; // فعال کردن چک‌باکس حروف بزرگ
    lowercase.checked = true; // فعال کردن چک‌باکس حروف کوچک
    numbers.checked = true; // فعال کردن چک‌باکس اعداد
    symbols.checked = true; // فعال کردن چک‌باکس علامت‌ها

    // بعد از این که تیک امن‌ترین حالت فعال شد، طول پسورد رو تغییر میدیم
    document.getElementById('length').value = 12;
});

// رویداد تغییر وضعیت تیک امن‌ترین حالت
maxSecure.addEventListener('change', () => {
    if (maxSecure.checked) {
        uppercase.checked = true;
        lowercase.checked = true;
        numbers.checked = true;
        symbols.checked = true;
        document.getElementById('length').value = 12; // تغییر طول پسورد به 12
    } else {
        // اگر تیک امن‌ترین حالت برداشته شد، طول پسورد رو 8 می‌کنیم
        document.getElementById('length').value = 8;

        // چک‌باکس‌های دیگر رو غیر فعال می‌کنیم
        uppercase.checked = false;
        lowercase.checked = false;
        numbers.checked = false;
        symbols.checked = false;
    }
});
copyBtn.addEventListener('click', () => {
    if (!passwordInput.value) return;

    navigator.clipboard.writeText(passwordInput.value)
        .then(() => {
            // نمایش پاپ‌آپ
            copyPopup.classList.add('show');

            // بعد از 2 ثانیه پاپ‌آپ محو شود
            setTimeout(() => {
                copyPopup.classList.remove('show');
            }, 2000);
        })
        .catch(err => console.error(err));
});
