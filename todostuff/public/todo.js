angular.module('todoApp')
.controller('TodoController', function($scope, $http) {
  $scope.getTodos = function() {
    $http.get('/api/todos')
    .then(function(response) {
      $scope.todos = response.data;
    });
  }

  $scope.addTodo = function() {
    $http.post('/api/todos', {task: $scope.newTodo})
    .then(function() {
      $scope.newTodo = ''
      $scope.getTodos();
    });
  }

  $scope.updateTodo = function(todo) {
    $http.put('/api/todos/' + todo._id, todo)
    .then(function() {
      $scope.getTodos();
    });
  }

  $scope.deleteTodo = function(id) {
    $http.delete('/api/todos/' + id)
    .then(function() {
      $scope.getTodos();
    });
  }
});
