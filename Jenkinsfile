pipeline {
    agent any
    environment {
    PATH = "/opt/bun/bin:${env.PATH}"
}
    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Repository') {
    steps {
        sh '''
            echo "Current directory:"
            pwd

            echo "RealWorld submodule:"
            ls -la realworld

            echo "Bruno test script:"
            ls -l realworld/specs/api/run-api-tests-bruno.sh
        '''
    }
}

        stage('Install Dependencies') {
    steps {
        sh '''
            export PATH="/opt/bun:$PATH"
            bun --version
            bun install --frozen-lockfile
        '''
    }
}

        stage('Generate Prisma Client') {
    steps {
        sh '''
            export PATH="/opt/bun:$PATH"
            bun x prisma generate
        '''
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