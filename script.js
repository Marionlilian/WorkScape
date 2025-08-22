class JobListing {
    constructor() {
        this.modal = document.getElementById('modal');
        this.browseBtn = document.getElementById('browsebtn');
        this.postBtn = document.getElementById('postbtn');
        this.loginBtn = document.getElementById('loginbtn');
        this.signupBtn = document.getElementById('signupbtn');
        this.signUp = this.signUp.bind(this);
        this.signupBtn.addEventListener('click', this.signUp);

        this.browseJobs = this.browseJobs.bind(this);
        this.postJobs = this.postJobs.bind(this);
        this.loginUser = this.loginUser.bind(this);
        

       
        this.browseBtn.addEventListener('click', this.browseJobs);
        this.postBtn.addEventListener('click', this.postJobs);
        this.loginBtn.addEventListener('click', this.loginUser);

        
        window.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.modal.style.display = 'none';
            }
        });

        
        localStorage.setItem('username', 'admin');
        localStorage.setItem('password', '1234');
    }

    browseJobs(event) {
        event.preventDefault();
        this.modal.style.display = 'block';
    }

    loginUser(event) {
        event.preventDefault();

        const inputUsername = document.getElementById('UserName').value;
        const inputPassword = document.getElementById('password').value;

        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (inputUsername === storedUsername && inputPassword === storedPassword) {
            alert(`Welcome ${storedUsername}!`);
            this.modal.style.display = 'none';
        } else {
            alert('Invalid credentials. Please sign up.');
        }
    }
    signUp(event){
        event.preventDefault();

        const createnewusername= document.getElementById('newusername').value;
        const createnewpassword = document. getElementById('newpassword').value;

        const existingUsername = localStorage.getItem('newusername');
        const existingPassword = localStorage.getItem('newpassword')

        if (
            createnewusername ===existingUsername 
            && createnewpassword ===existingPassword
        ){
            alert(`You have an account. Login`)

        } else{
            localStorage.setItem('username', createnewusername);
            localStorage.setItem('password', createnewpassword);

            console.log ('Registration successful. You can now log in!');
        };

    }

    postJobs() {
        console.log('Posting a job...');
    }

    filterJobs() {
        console.log('Filtering jobs...');
    }

    fetchJobs() {
        console.log('Fetching jobs...');
    }

    signUp() {
        // Future logic for sign-up
    }
}

// Initialize when page loads
window.onload = function () {
    const jobListing = new JobListing();
};
