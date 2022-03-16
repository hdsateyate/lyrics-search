const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// Search by song or artist
async function searchSongs(term) {
   const res = await fetch(`${apiURL}/suggest/${term}`);
   const data = await res.json();

   showDataInDOM(data);
}

// Show song and artist in DOM
function showDataInDOM(data) {   
   let output = '';

   data.data.forEach(song => {
      output += `
         <li>
            <span><strong>${song.artist.name}</strong> - ${song.title}</span>
            <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
         </li>`;
   });

   result.innerHTML = `
      <ul class="songs">
         ${output};
      </ul>`;
}


// using .then, deprecated
// function searchSongs(term) {
//    fetch(`${apiURL}/suggest/${term}`)
//       .then(res => res.json())
//       .then(data => console.log(data));
// }



// Event Listeners ///////////////////

form.addEventListener('submit', e => {
   e.preventDefault();

   const searchTerm = search.value.trim();

   if (!searchTerm) {
      alert('Please type in your search term')
   } else {
      searchSongs(searchTerm);
   }
});