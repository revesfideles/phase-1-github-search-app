const searchForm = document.getElementById('github-form');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const repositories = document.getElementById('repositories');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const searchQuery = searchInput.value.trim();

  searchUsers(searchQuery);
});

function searchUsers(query) {
  fetch(`https://api.github.com/search/users?q=${query}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
    .then(response => response.json())
    .then(data => {
      displayUsers(data.items);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayUsers(users) {
  searchResults.innerHTML = '';

  users.forEach(user => {
    const userElement = document.createElement('div');
    userElement.classList.add('user');

    const usernameElement = document.createElement('h2');
    usernameElement.textContent = user.login;

    const avatarElement = document.createElement('img');
    avatarElement.src = user.avatar_url;
    avatarElement.alt = user.login;

    const profileLinkElement = document.createElement('a');
    profileLinkElement.href = user.html_url;
    profileLinkElement.textContent = 'View Profile';

    userElement.appendChild(usernameElement);
    userElement.appendChild(avatarElement);
    userElement.appendChild(profileLinkElement);

    userElement.addEventListener('click', function() {
      getUserRepositories(user.login);
    });

    searchResults.appendChild(userElement);
  });
}

function getUserRepositories(username) {
  fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
    .then(response => response.json())
    .then(data => {
      displayRepositories(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayRepositories(repositoriesData) {
  repositories.innerHTML = '';

  repositoriesData.forEach(repo => {
    const repoElement = document.createElement('div');
    repoElement.classList.add('repository');

    const repoNameElement = document.createElement('h3');
    repoNameElement.textContent = repo.name;

    const repoDescriptionElement = document.createElement('p');
    repoDescriptionElement.textContent = repo.description;

    const repoLinkElement = document.createElement('a');
    repoLinkElement.href = repo.html_url;
    repoLinkElement.textContent = 'View on GitHub';

    repoElement.appendChild(repoNameElement);
    repoElement.appendChild(repoDescriptionElement);
    repoElement.appendChild(repoLinkElement);

    repositories.appendChild(repoElement);
  });
}