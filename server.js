async function fetchAvatar() {
    const userId = document.getElementById('discord-id').value.trim();
    const avatarElement = document.getElementById('avatar');
    const errorElement = document.getElementById('error-message');
    const downloadButton = document.getElementById('download-button');
    
    if (!userId) {
        alert('Please enter a user ID!');
        return;
    }

    avatarElement.style.display = 'none';
    errorElement.style.display = 'none';
    errorElement.textContent = '';
    downloadButton.style.display = 'none';

    try {
        const response = await fetch(`/api/avatar/${userId}`);
        const data = await response.json();
        
        if (data.avatarUrl) {

            const avatarUrl = `${data.avatarUrl}?size=1024`;
            avatarElement.src = avatarUrl;
            avatarElement.style.display = 'block';

            downloadButton.style.display = 'inline-block';
            downloadButton.setAttribute('href', avatarUrl);
            downloadButton.setAttribute('download', `${userId}-avatar.png`);
        } else {
            errorElement.textContent = data.error || 'Avatar not found.';
            errorElement.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        errorElement.textContent = 'An error occurred while fetching the avatar.';
        errorElement.style.display = 'block'; 
    }
}
