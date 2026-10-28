const events = [
  {
    id: 1,
    title: "Hackathon",
    date: "2026-11-15",
    venue: "Computer Lab",
    category: "Technical",
    description: "Participate in a coding competition and build innovative projects."
  },
  {
    id: 2,
    title: "Web Development Workshop",
    date: "2026-11-20",
    venue: "Seminar Hall",
    category: "Technical",
    description: "Learn HTML, CSS and JavaScript."
  },
  {
    id: 3,
    title: "Cultural Fest",
    date: "2026-11-25",
    venue: "College Auditorium",
    category: "Cultural",
    description: "Enjoy music, dance and cultural performances."
  },
  {
    id: 4,
    title: "Sports Day",
    date: "2026-12-05",
    venue: "College Ground",
    category: "Sports",
    description: "Participate in exciting college sports competitions."
  }
];

function getRegistrations() {
  try {
    return JSON.parse(localStorage.getItem("registrations")) || [];
  } catch {
    return [];
  }
}

function saveRegistrations(registrations) {
  localStorage.setItem(
    "registrations",
    JSON.stringify(registrations)
  );
}

function registerStudent(eventId, name, regNo, email) {
  if (!name.trim() || !regNo.trim() || !email.trim()) {
    alert("Please fill in all mandatory fields.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const registrations = getRegistrations();

  const duplicate = registrations.some(
    registration =>
      registration.eventId === eventId &&
      registration.regNo.toLowerCase() === regNo.trim().toLowerCase()
  );

  if (duplicate) {
    alert("You have already registered for this event.");
    return;
  }

  registrations.push({
    eventId,
    name: name.trim(),
    regNo: regNo.trim(),
    email: email.trim(),
    registeredAt: new Date().toISOString()
  });

  saveRegistrations(registrations);
  alert("Registration successful!");

  displayRegistrations();
}

function createEventCard(event) {
  const card = document.createElement("div");
  card.className = "event-card";

  const title = document.createElement("h3");
  title.textContent = event.title;

  const details = document.createElement("p");
  details.textContent =
    "Date: " + event.date +
    " | Venue: " + event.venue +
    " | Category: " + event.category;

  const description = document.createElement("p");
  description.textContent = event.description;

  const button = document.createElement("button");
  button.textContent = "Register Now";

  button.addEventListener("click", () => {
    const name = prompt("Enter your full name:");
    if (name === null) return;

    const regNo = prompt("Enter your registration number:");
    if (regNo === null) return;

    const email = prompt("Enter your email address:");
    if (email === null) return;

    registerStudent(event.id, name, regNo, email);
  });

  card.append(title, details, description, button);
  return card;
}

function findSection(headingText) {
  const headings = document.querySelectorAll("h1, h2, h3");

  for (const heading of headings) {
    if (heading.textContent.trim().toLowerCase() ===
        headingText.toLowerCase()) {
      let section = heading.parentElement;

      while (section && section.children.length < 2) {
        section = section.parentElement;
      }

      return section || heading.parentElement;
    }
  }

  return null;
}

function getOrCreateContainer(section, id) {
  if (!section) return null;

  let container = document.getElementById(id);

  if (!container) {
    container = document.createElement("div");
    container.id = id;
    section.appendChild(container);
  }

  return container;
}

function displayEvents() {
  const section = findSection("Upcoming Events");
  const container = getOrCreateContainer(section, "events-container");

  if (!container) return;

  const searchInput = document.querySelector(
    'input[placeholder*="Search"], input[placeholder*="search"]'
  );

  const categorySelect = document.querySelector("select");

  const dateInput = document.querySelector('input[type="date"]');

  const searchText = searchInput ? searchInput.value.toLowerCase() : "";
  const category = categorySelect ? categorySelect.value : "";
  const date = dateInput ? dateInput.value : "";

  container.replaceChildren();

  const filteredEvents = events.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchText) ||
      event.description.toLowerCase().includes(searchText) ||
      event.category.toLowerCase().includes(searchText);

    const matchesCategory =
      !category ||
      category.toLowerCase().includes("all") ||
      event.category.toLowerCase() === category.toLowerCase();

    const matchesDate = !date || event.date === date;

    return matchesSearch && matchesCategory && matchesDate;
  });

  if (filteredEvents.length === 0) {
    container.textContent = "No events found. Try changing your filters.";
    return;
  }

  filteredEvents.forEach(event => {
    container.appendChild(createEventCard(event));
  });
}

function displayRegistrations() {
  const section = findSection("My Registrations");
  const container = getOrCreateContainer(
    section,
    "registrations-container"
  );

  if (!container) return;

  container.replaceChildren();

  const registrations = getRegistrations();

  if (registrations.length === 0) {
    container.textContent = "You have not registered for any events yet.";
    return;
  }

  registrations.forEach(registration => {
    const event = events.find(
      item => item.id === registration.eventId
    );

    const card = document.createElement("div");
    card.className = "registration-card";

    const title = document.createElement("h3");
    title.textContent = event ? event.title : "Event";

    const details = document.createElement("p");
    details.textContent =
      "Name: " + registration.name +
      " | Register No: " + registration.regNo +
      " | Email: " + registration.email;

    const date = document.createElement("p");
    date.textContent = event ? "Event Date: " + event.date : "";

    card.append(title, details, date);
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(
    'input[placeholder*="Search"], input[placeholder*="search"]'
  );

  const categorySelect = document.querySelector("select");
  const dateInput = document.querySelector('input[type="date"]');

  if (searchInput) {
    searchInput.addEventListener("input", displayEvents);
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", displayEvents);
  }

  if (dateInput) {
    dateInput.addEventListener("change", displayEvents);
  }

  displayEvents();
  displayRegistrations();
});

if (document.readyState !== "loading") {
  displayEvents();
  displayRegistrations();
}
