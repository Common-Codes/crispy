const guildList = document.querySelector('.guilds');

const setupGuilds = (data) => {

  let html = '';
  data.forEach(doc => {
    const guild = doc.data();
    const li = `
      <li>
        <div class="collapsible-header grey lighten-4"> ${guild.title} </div>
        <div class="collapsible-body white"> ${guild.content} </div>
      </li>
    `;
    html += li;
  });
  guildList.innerHTML = html

};

document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});