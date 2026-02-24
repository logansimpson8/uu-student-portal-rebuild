const stars = document.querySelectorAll(".fav-star");
const favList = document.querySelector(".fav-list");

window.addEventListener('load', () => {
    const savedFavs = localStorage.getItem('favs');

    if (savedFavs) {
        const favourites = JSON.parse(savedFavs);
        favourites.forEach(x => {
            updateSidebar(x.name, x.url);

            const tile = document.querySelector(`[data-name="${x.name}"]`);
            if (tile) {
                const star = tile.querySelector('.fav-star');
                star.classList.add('fa-solid');
                star.classList.remove('fa-regular');
            }
        });
    }
});

stars.forEach(star => {
    star.addEventListener('click', (e) => {
        e.preventDefault(); 
        star.classList.toggle('fa-solid');
        star.classList.toggle('fa-regular');

        const tile = star.parentElement;
        const name = tile.getAttribute('data-name');
        const link = tile.getAttribute('data-link');

        updateSidebar(name, link); 
        saveFavorites(); 
    });
});

function saveFavourites() {
    const favourites = [];
    document.querySelectorAll('.sidebar-item').forEach(link => {
        favourites.push({
            name: link.innerText,
            url: link.href
        });
    });
    localStorage.setItem('favs', JSON.stringify(favourites));
}

function updateSidebar(name, link) {
    const existingFav = document.querySelector(`[fav="${name}"]`);

    if (existingFav) { 
        existingFav.remove();
    } else {
        const newFav = document.createElement('a');
        newFav.href = link;
        newFav.innerText = name;
        newFav.setAttribute('fav', name);
        newFav.classList.add('sidebar-item');
        favList.appendChild(newFav);
    }
}

function updateTime() {
    const now = new Date();
    const hour = now.getHours();
    
    let greetingMessage = "Good Evening,";
    if (hour < 12) greetingMessage = "Good Morning,";
    else if (hour < 18) greetingMessage = "Good Afternoon,";

    const dateformat = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateStr = now.toLocaleDateString('en-GB', dateformat);
    const timestr = now.toLocaleTimeString('en-GB', { hour12: false });

    document.getElementById('greeting').innerText = greetingMessage;
    document.getElementById('time-display').innerText = `${dateStr} | ${timestr}`;
}

setInterval(updateTime, 1000);
updateTime();
