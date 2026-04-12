pipeline {
    agent any

    tools {
        nodejs 'NodeJS'   // Must match the name you set in Jenkins Tools
    }

    environment {
        IMAGE_NAME     = 'react-group1-app'
        CONTAINER_NAME = 'react-group1-container'
        APP_PORT       = '3000'
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
                sh 'CI=true npm test'
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building Docker image: ${IMAGE_NAME}..."
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Run Container') {
            steps {
                sh "docker stop ${CONTAINER_NAME} || true"
                sh "docker rm   ${CONTAINER_NAME} || true"
                sh """
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${APP_PORT}:3000 \
                        ${IMAGE_NAME}
                """
                echo "App running at http://localhost:${APP_PORT}"
            }
        }
    }

    post {
        success { echo 'Pipeline complete! App is live.' }
        failure {
            sh "docker stop ${CONTAINER_NAME} || true"
            sh "docker rm   ${CONTAINER_NAME} || true"
        }
    }
}