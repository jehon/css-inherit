pipeline {
  agent any
  options {
    ansiColor('xterm')
    skipStagesAfterUnstable()
    timeout(time: 5, unit: 'MINUTES')
  }
  stages {
    stage('dependencies') {
      steps {
        sh 'npm ci'
      }
    }
    stage('test') {
      steps {
        sh 'npm run test'
      }
    }
    // stage('Deploy') {
    //   when {
    //     branch 'master'
    //   }
    // }
  }
}