#### Website Name: TechHive
#### Website Live Link: https://tech-hive-d9f7e.web.app/

#### Features of website-
* Home page consisting of an attractive carousel, featured products, and recently added products in trending section
* Users are able to upvote a product, view it's details and report it
* Regular users can view their profile add a product and see the list of their added products
* Users purchase memberships subscription through a payment system with or without discount to add more than one product
* Moderators are able to review pending products added by other users and accept or reject them
* Moderators are able to view reported products and delete them
* Admins are able to update the role of a user to moderator or admin
* Admins are able to add new coupons and see existing coupons
* Admins can see a pie chart to see the statistics of the website

#### Instructions to Clone and Run the Client Side

1. **Clone the Repository**
    ```bash
    git clone https://github.com/MiM1303/techhive-client.git
    cd your-repo-name/client
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**
    - Create a `.env` file in the `client` directory and add the necessary environment variables:
        ```env
        REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
        REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
        REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
        REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
        REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
        ```

4. **Run the Client**
    ```bash
    npm start
    ```

5. **Access the Application**
    - Open your web browser and navigate to `http://localhost:3000` to access the application.
