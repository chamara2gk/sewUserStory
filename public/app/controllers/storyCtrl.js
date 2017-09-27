angular.module('storyCtrl', ['storyService'])

.controller('StoryController', function(Story, socketio){

	var vm = this;

	Story.all()
		.then(function(data){

			console.log(data.data);
			vm.stories = data.data;
		});

	vm.createStory = function(){

		Story.create(vm.storyData)
			.then(function(data){
				vm.message = '';
				//Clear up the form
				vm.storyData = '';
	
				vm.message = data.data.message;

			});
	};

	socketio.on('story', function(data){
		vm.stories.push(data);
	})

})


.controller('AllStoriesController', function(stories, socketio){
	var vm = this;

	vm.stories = stories.data;

	socketio.on('story', function(data){
		vm.stories.push(data);
	});
});