const openDrawerButton = document.getElementById('openDrawer');
const createNewTicketForm = document.getElementById('createNewTicket');
const claimTicketButtons = document.querySelectorAll('.claimTicket');
const logoutButton = document.getElementById('logout');
const sideDrawer = document.getElementById('sideDrawer');

const openDrawer = async () => {
  try {
    openDrawerButton.addEventListener('click', () => {
      sideDrawer.classList.toggle('open');
    });
  } catch (error) {
    console.error('Error opening drawer:', error);
  }
};

const createNewTicket = async (event) => {
  event.preventDefault();

  const formData = new FormData(createNewTicketForm);
  const ticketData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/api/ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    });

    if (response.ok) {
      const data = await response.json();
    } 

  } catch (error) {
    console.error('Error creating ticket:', error);
  }
};

const claimTicket = async (event) => {
  const ticketId = event.target.dataset.ticketId;

  try {
    const response = await fetch(`/api/ticket/${ticketId}`, {
      method: 'PUT',
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Ticket claimed:', data);
    } 
    
  } catch (error) {
    console.error('Error claiming ticket:', error);
  }
};

const logout = async () => {
  try {
    const response = await fetch('/api/user', {
      method: 'DELETE',
    });

    if (response.ok) {
      window.location.href = '/login';
    } 

  } catch (error) {
    console.error('Error logging out:', error);
  }
};

openDrawerButton.addEventListener('click', openDrawer);
createNewTicketForm.addEventListener('submit', createNewTicket);
logoutButton.addEventListener('click', logout);

claimTicketButtons.forEach((button) => {
  button.addEventListener('click', claimTicket);
});

