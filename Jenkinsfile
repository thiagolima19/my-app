pipeline {
    agent any

    environment {
        IMAGE_NAME = 'react-group3-app'
        CONTAINER_NAME = 'react-group3-container'
        APP_PORT = '3000'
    }

    stages {

        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
                echo 'Building the React app...'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // CI=true prevents the test runner from launching a watcher
                sh 'CI=true npm test'
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building Docker image: ${IMAGE_NAME}..."
                sh "docker build -t ${IMAGE_NAME} ."
                echo 'Docker image built successfully.'
            }
        }

        stage('Run Container') {
            steps {
                echo 'Stopping and removing any existing container...'
                // Use "|| true" so the pipeline doesn't fail if the container doesn't exist yet
                sh "docker stop ${CONTAINER_NAME} || true"
                sh "docker rm   ${CONTAINER_NAME} || true"

                echo "Starting container on port ${APP_PORT}..."
                sh """
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${APP_PORT}:3000 \
                        ${IMAGE_NAME}
                """
                echo "Application is running at http://localhost:${APP_PORT}"
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully! App is live.'
        }
        failure {
            echo 'Pipeline failed. Check the logs above for details.'
            // Clean up the container on failure to avoid stale state
            sh "docker stop ${CONTAINER_NAME} || true"
            sh "docker rm   ${CONTAINER_NAME} || true"
        }
    }
}
