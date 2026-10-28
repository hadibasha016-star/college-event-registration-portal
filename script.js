=== regNo)  );
  saveRegistrations(updated);  alert("const events = [ 
 { id: 1, title: "Web Development Workshop", 
   date: "2026-11-15", venue: "Computer Lab", 
   category: "Technical",
    description: "Learn the basics of web development.",   
 capacity: 50, cancellationAllowed: true }, 
 { id: 2, title: "Cultural Fest", 
   date: "2026-11-20", venue: "College Auditorium", 
   category: "Cultural", 
   description: "Participate in cultural activities.",  
  capacity: 100, cancellationAllowed: true }
 ];
const getRegistrations = () => 
 JSON.parse(localStorage.getItem("registrations") || "[]");
function saveRegistrations(registrations) { 
 localStorage.setItem("registrations", JSON.stringify(registrations)); 
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
  const event = events.find(e => e.id === eventId); 
 if (!event) {
    alert("Event not found."); 
   return;  
}
  const registrations = getRegistrations(); 
 const duplicate = registrations.some(r => 
   r.eventId === eventId && 
   r.regNo.toLowerCase() === regNo.trim().toLowerCase() 
 ); 
 if (duplicate) {   
 alert("You are already registered for this event.");  
  return;  
}
  const count = registrations.filter( 
   r => r.eventId === eventId 
 ).length; 
 if (count >= event.capacity) { 
   alert("Sorry, this event is full."); 
   return; 
 }
  registrations.push({ 
   eventId, name: name.trim(),  
  regNo: regNo.trim(), email: email.trim() 
 }); 
 saveRegistrations(registrations); 
 alert("Registration successful!");
 }
function cancelRegistration(eventId, regNo) {
  const event = events.find(e => e.id === eventId);
  if (!event || !event.cancellationAllowed) {  
  alert("Cancellation is not permitted.");  
  return; 
 }
  const updated = getRegistrations().filter(r =>  
  !(r.eventId === eventId && r.regNo Cancellation request processed.");
