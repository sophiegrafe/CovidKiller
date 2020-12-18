import './styles.scss';
import { vaccines } from './src/data';

const app = document.getElementById('app');
app.innerHTML = `
    <header>
      <h1>Coronavirus Vaccines</h1>
      <div id="btnHeader">
        <button id="btnPriceFilter">Price Ordered</button>
        <button id="btnApprovedFilter">Approuved Only</button>
      </div>
    </header>
    <main></main>
    <footer></footer>
`;
const main = document.querySelector('main');
vaccines.forEach((vaccine) => {
  main.innerHTML += `
        <div class="card" id="${vaccine.id}">
          <div class="cardImg">
            <img src="${vaccine.name}.jpg" alt="" />              
          </div>
          <div class="cardInfos">
            <h3 class="vaccinesName">${vaccine.name}</h3>
            <p class="vaccinesPatent"><strong>Inventor:</strong> ${
  vaccine.patent
}</p>
            <p class="vaccinesProducer>"><strong>Product Origin:</strong> ${
  vaccine.producer
}</p>
            <p class="vaccinesMethod>"><strong>Methods:</strong> ${
  vaccine.method
}</p>
            <p class="vaccinesApproval"><strong>Status:</strong> ${
  vaccine.approved ? 'Approved' : 'Unapproved yet'
}</p>
            <p class="vaccinesMethod>"><strong>Quantity:</strong> ${
  vaccine.quantity
} units</p>
            <p class="vaccinesUPrice>"><strong>Unity price:</strong> ${
  vaccine.uPrice
} USD</p>            
          </div>
          <div class="reserve">
            <label for="quantityReserved">Desired quantity: </label>
            <input type="hidden" name="hiddenVaccineName" value="${
  vaccine.name
}">
            <input            
            type="number"
            min="0"
            step="1"
            name="quantityReserved"
            value="0"
            />
            <button class="btnReserve">Reserve</button>
          </div>
        </div>        
        `;
});

const footer = document.querySelector('footer');

footer.innerHTML = `
  <h2>Your Order Cart:</h2>  
  <div id="reservedVaccine"></div> 
  <button id="finalOrder">Finalize the order</button>
`;

document.body.addEventListener('click', (e) => {
  /** ***** boutons du header ****** */
  /* hide unapprove vaccines */
  if (e.target.matches('#btnApprovedFilter')) {
    const vaccinesCards = document.querySelectorAll('.card');
    for (const vaccine of vaccines) {
      vaccinesCards.forEach((card) => {
        const cardId = parseInt(card.id, 10);
        if (cardId === vaccine.id && vaccine.approved === false) {
          const cardToHide = card;
          cardToHide.style.display = 'none';
        }
      });
    }
    e.target.innerHTML = 'Show All';
    e.target.id = 'btnshowAllVaccines';
  /* reveal all vaccines */
  } else if (e.target.matches('#btnshowAllVaccines')) {
    const vaccinesCards = document.querySelectorAll('.card');
    vaccinesCards.forEach((card) => {
      const cardToShow = card;
      cardToShow.style.display = 'block';
    });
    e.target.innerHTML = 'Approuved Only';
    e.target.id = 'btnApprovedFilter';
  /* injection reserved vaccines in footer */
  } else if (e.target.matches('.btnReserve')) {
    const reservedQuantity = e.target.parentNode.querySelector(
      'input[name="quantityReserved"]',
    ).value;
    if (reservedQuantity > 0) {
      const footerReservedDiv = document.getElementById('reservedVaccine');
      const inputHiddenName = e.target.parentNode.querySelector('input[name="hiddenVaccineName"]').value;
      footerReservedDiv.innerHTML += `      
        <p>${inputHiddenName} - Quantity Reserved: ${reservedQuantity} unit(s)</p>      
      `;
      e.target.parentNode.querySelector('input[name="quantityReserved"]').style.display = 'none';
      e.target.disabled = 'disabled';
    }
  } else if (e.target.matches('#finalOrder')) {
    app.innerHTML = `
    <div id="finalMessage">
      <h2>Your Order As Been Placed</h2>
      <p>Thank you for your trust</p>    
    </div>
    `;
  }
});
