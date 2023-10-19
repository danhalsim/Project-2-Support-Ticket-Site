const openDrawerButton = document.getElementById('openDrawer');
const updateTicketForm = document.getElementById('updateTicket');
const addMessageForm = document.getElementById('addMessage');
const toggleHideMessageButtons = document.querySelectorAll('.toggleHideMessage');
const logoutButton = document.getElementById('logout');

const openDrawer = () => {
  try {
    openDrawerButton.addEventListener('click', () => {
      sideDrawer.classList.toggle('open');
    });
  } catch (error) {
    console.error('Error opening drawer:', error);
  }
};

const updateTicket = async (event) => {
  event.preventDefault();

  const ticketId = event.target.dataset.ticketId; 
  const formData = new FormData(updateTicketForm);
  const ticketData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(`/api/ticket/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Ticket updated:', data);
    } 

  } catch (error) {
    console.error('Error updating ticket:', error);
  }
};

const addMessage = async (event) => {
  event.preventDefault();

  const ticketId = event.target.dataset.ticketId; 
  const isDrawer = event.target.dataset.isDrawer; 
  const formData = new FormData(addMessageForm);
  const messageData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(`/api/log/${ticketId}?drawer=${isDrawer}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    });

    if (response.ok) {
      const data = await response.json();
    } 

  } catch (error) {
    console.error('Error adding message:', error);
  }
};

const toggleHideMessage = async (event) => {
  const ticketId = event.target.dataset.ticketId; 
  const logId = event.target.dataset.logId; 
  const isDrawer = event.target.dataset.isDrawer; 

  try {
    const response = await fetch(`/api/log/${ticketId}/${logId}?drawer=${isDrawer}`, {
      method: 'PUT',
    });

    if (response.ok) {
      const data = await response.json();
    } 

  } catch (error) {
    console.error('Error toggling message status:', error);
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
updateTicketForm.addEventListener('submit', updateTicket);
addMessageForm.addEventListener('submit', addMessage);
logoutButton.addEventListener('click', logout);

toggleHideMessageButtons.forEach((button) => {
  button.addEventListener('click', toggleHideMessage);
});

