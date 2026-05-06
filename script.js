// Set minimum date to today
document.addEventListener('DOMContentLoaded', function() {
    const departureInput = document.getElementById('departure');
    const today = new Date().toISOString().split('T')[0];
    departureInput.min = today;

    // Handle form submission
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleBooking();
    });

    // Add scroll animation for cards
    observeCards();
});

// Handle booking submission
function handleBooking() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const departure = document.getElementById('departure').value;
    const passengers = document.getElementById('passengers').value;
    const cabin = document.getElementById('cabin').value;
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;

    // Validate form
    if (!from || !to || !departure || !passengers || !cabin || !email || !name) {
        alert('Please fill in all fields!');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }

    // Create booking object
    const booking = {
        from: from,
        to: to,
        departure: departure,
        passengers: passengers,
        cabin: cabin,
        email: email,
        name: name,
        bookingDate: new Date().toLocaleString(),
        bookingId: 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    // Log booking
    console.log('Booking Confirmed:', booking);

    // Store in localStorage
    localStorage.setItem('lastBooking', JSON.stringify(booking));

    // Display confirmation
    displayConfirmation(booking);

    // Reset form
    document.getElementById('bookingForm').reset();
}

// Display booking confirmation
function displayConfirmation(booking) {
    const confirmationMessage = `
✅ BOOKING CONFIRMED!

Booking ID: ${booking.bookingId}
Passenger: ${booking.name}
Email: ${booking.email}

Journey Details:
• From: ${booking.from}
• To: ${booking.to}
• Departure: ${booking.departure}
• Passengers: ${booking.passengers}
• Cabin Type: ${booking.cabin.charAt(0).toUpperCase() + booking.cabin.slice(1)}

A confirmation email has been sent to: ${booking.email}
    `;

    alert(confirmationMessage);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
function observeCards() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.route-card, .feature').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Load last booking on page load
window.addEventListener('load', function() {
    const lastBooking = localStorage.getItem('lastBooking');
    if (lastBooking) {
        console.log('Last Booking Retrieved:', JSON.parse(lastBooking));
    }
});

// Format date display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}