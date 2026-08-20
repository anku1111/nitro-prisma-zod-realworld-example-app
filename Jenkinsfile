pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'bun install --frozen-lockfile'
            }
        }

        stage('Generate Prisma Client') {
            steps {
                sh 'bun x prisma generate'
            }
        }

        stage('Run Bruno Tests') {
            steps {
                sh 'make test-with-bruno'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t realworld-app:${BUILD_NUMBER} .'
            }
        }
    }

    post {
        success {
            echo 'CI pipeline completed successfully!'
        }

        failure {
            echo 'CI pipeline failed.'
        }

        always {
            sh 'docker image prune -f || true'
        }
    }
}