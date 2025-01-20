document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registro exitoso');
        } else {
            alert(data.message || 'Error al registrarse');
        }
    } catch (error) {
        console.error('Error de conexión con el servidor', error);
        alert('Error de conexión con el servidor');
    }
});

//LOGIN
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://127.0.0.1:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            showNotification('Inicio de sesión exitoso.', 'success');
            setTimeout(() => {
                window.location.href = '/profile'; // Redirigir a profile.html después de 3 segundos
            }, 3000);  // 3 segundos de espera
        } else {
            showNotification(data.error || 'Error al iniciar sesión.', 'error');
        }
    } catch (error) {
        showNotification('Error de conexión con el servidor.', 'error');
    }
});

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;  // Añadir clase de tipo de notificación
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none', 5000);  // Ocultar la notificación después de 5 segundos
}
