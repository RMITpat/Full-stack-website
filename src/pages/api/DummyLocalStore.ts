const DummyLocalStore = () =>{
    const Dummy = {
        "john.doe@example.com": {
            "password": "password123",
            "name": "John Doe",
            "type": "lecturer"
        },
        "jane.smith@example.com": {
            "password": "securePass456",
            "name": "Jane Smith",
            "type": "tutor"
        },
        "alice.johnson@example.com": {
            "password": "mypassword789",
            "name": "Alice Johnson",
            "type": "applicant"
        },
        "bob.brown@example.com": {
            "password": "passw0rd!234",
            "name": "Bob Brown",
            "type": "lecturer"
        },
        "charlie.davis@example.com": {
            "password": "charlie2025",
            "name": "Charlie Davis",
            "type": "tutor"
        },
        "emma.wilson@example.com": {
            "password": "emmasecure123",
            "name": "Emma Wilson",
            "type": "applicant"
        },
        "david.jones@example.com": {
            "password": "davidpassword",
            "name": "David Jones",
            "type": "tutor"
        },
        "sophia.miller@example.com": {
            "password": "sophiaPass!456",
            "name": "Sophia Miller",
            "type": "lecturer"
        },
        "mike.taylor@example.com": {
            "password": "mike1234",
            "name": "Mike Taylor",
            "type": "applicant"
        },
        "linda.brown@example.com": {
            "password": "lindaPass789",
            "name": "Linda Brown",
            "type": "tutor"
        }
    }
    localStorage.setItem("DummyData", JSON.stringify(Dummy));

    const dummyFromLocal = localStorage.getItem("DummyData");
    console.log("dummy data inserted?: \n", dummyFromLocal ? JSON.parse(dummyFromLocal) : "Dummy data insert doesnt seem to have worked :(");


}
export default DummyLocalStore;