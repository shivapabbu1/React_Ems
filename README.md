
React Application Setup and Build Instructions
Prerequisites

    Ensure you have Node.js installed. If not, download and install it from Node.js official website.

    .env file as instructred in step 1.1

Steps to Build and Run the Application

    Clone the Repository:




    git clone <repository_url>




    cd <repository_directory>

1.1 create an env file with following variables defined VITE_API_ROLES_URL VITE_API_EMS_BACKEND_API




example .env file




VITE_API_ROLES_URL=https://itynerds.com/roles




VITE_API_EMS_BACKEND_API=http://localhost:6003

    Install Dependencies:




    npm install

    Run the Development Server:




    npm run dev

        The development server will start, usually accessible at http://localhost:5173.

steps to build and deploy the fe on ems-staging server.

Prerequisites:

    new .env file as required for ems-staging
    upload access to aws s3 bucket ems-staging

    Build the Application:




    npm run build

        This will create an optimized production build in the dist directory.

    Preview the Build:




    npm run preview

        This will start a local server to preview the production build.

    Run Tests (Optional):




    npm test

        Run tests if your project includes any.

    Deploy the Application:

Uploading Build Files to AWS S3 Bucket




1. **Install AWS CLI:**




- Ensure you have the AWS CLI installed. If not, you can install it by following the instructions [here](https://aws.amazon.com/cli/).









2. **Configure AWS CLI:**




```bash




aws configure




```




- Enter your AWS Access Key ID, Secret Access Key, region, and output format when prompted









3. **Upload to S3 Bucket:**




- Use the following command to upload your build files to the `ems-staging` bucket:




```bash




aws s3 sync dist/ s3://ems-staging




```




- This command syncs the contents of the `dist` directory with your S3 bucket.

Additional Notes:

    Replace <repository_url> and <repository_directory> with the actual URL of your repository and the desired directory name.

