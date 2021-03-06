// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

angular.module('mm.addons.mod_choice', [])

.constant('mmaModChoiceResultsNot', 0)
.constant('mmaModChoiceResultsAfterAnswer', 1)
.constant('mmaModChoiceResultsAfterClose', 2)
.constant('mmaModChoiceResultsAlways', 3)
.constant('mmaModChoiceComponent', 'mmaModChoice')
.constant('mmaModChoiceAutomSyncedEvent', 'mma-mod_choice_autom_synced')

.config(function($stateProvider) {

    $stateProvider

    .state('site.mod_choice', {
        url: '/mod_choice',
        params: {
            module: null,
            courseid: null
        },
        views: {
            'site': {
                controller: 'mmaModChoiceIndexCtrl',
                templateUrl: 'addons/mod/choice/templates/index.html'
            }
        }
    });

})

.config(function($mmCourseDelegateProvider, $mmContentLinksDelegateProvider, $mmCoursePrefetchDelegateProvider) {
    $mmCourseDelegateProvider.registerContentHandler('mmaModChoice', 'choice', '$mmaModChoiceHandlers.courseContent');
    $mmContentLinksDelegateProvider.registerLinkHandler('mmaModChoice', '$mmaModChoiceHandlers.linksHandler');
    $mmCoursePrefetchDelegateProvider.registerPrefetchHandler('mmaModChoice', 'choice', '$mmaModChoicePrefetchHandler');
})
.run(function($mmCronDelegate) {
    $mmCronDelegate.register('mmaModChoice', '$mmaModChoiceHandlers.syncHandler');
});
