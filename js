document.addEventListener('DOMContentLoaded', () => {
    const breedsList = document.getElementById('breeds-list');
    const imagesList = document.getElementById('images-list');
    const errorMessage = document.getElementById('error-message');

    // Função para buscar a lista de raças
    async function getBreeds() {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/list/all');
            if (!response.ok) {
                throw new Error('Não foi possível carregar as raças.');
            }
            const data = await response.json();
            const breeds = data.message;

            // Exibir os botões para cada raça
            Object.keys(breeds).forEach(breed => {
                const button = document.createElement('button');
                button.innerText = breed;
                button.addEventListener('click', () => fetchBreedImages(breed));
                breedsList.appendChild(button);
            });

        } catch (error) {
            errorMessage.innerText = `Erro: ${error.message}`;
        }
    }

    // Função para buscar imagens aleatórias da raça selecionada
    async function fetchBreedImages(breed) {
        try {
            errorMessage.innerText = ''; // Limpar mensagens de erro
            const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/4`);
            if (!response.ok) {
                throw new Error('Não foi possível carregar as imagens da raça.');
            }
            const data = await response.json();
            const images = data.message;

            // Exibir as imagens
            imagesList.innerHTML = ''; // Limpar imagens anteriores
            images.forEach(image => {
                const img = document.createElement('img');
                img.src = image;
                img.alt = breed;
                imagesList.appendChild(img);
            });

        } catch (error) {
            errorMessage.innerText = `Erro: ${error.message}`;
        }
    }

    // Chamar a função para carregar as raças assim que a página carregar
    getBreeds();
