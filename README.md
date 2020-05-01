[![Codeship Status for freerangeandy/video-game-reviews](https://app.codeship.com/projects/2547a580-6623-0138-2505-6646792103a8/status?branch=master)](https://app.codeship.com/projects/393632)

# README

Game Review Hero - An approachable website for users to post reviews for video games

Visit us: https://gamereviewhero.herokuapp.com/

Authors: Andy Lee, Monika Wilson, Benjamin Fairbank, Justin Stransky

## Description
Visitors to the site can see a list of games that have been submitted. A signed-in user can also submit a new game to be added to the library. Visitors can also click on individual games and get information about that game. They can read reviews for the game they are viewing. If signed in, a user can also leave their own review. A user can also see and delete their own reviews. The user profile includes a user name, profile picture, and list of contributed reviews.

## About
This web app was built in Ruby on Rails and React.

The gem "make_it_so" was used as a starting point for the app. This allows for default gems allowing Rspec, Devise, Postgres, Foundation, React and Jest among others. All the dependencies are in the Gemfile. In addition to the make_it_so gems, these three gems were added to the Gemfile.

gem "carrierwave"
gem "fog-aws"
gem "active_model_serializers"

## Getting started from our repository on your machine
Download or clone this repository from GitHub then run the following commands in the terminal to get the application running on your localhost.
```
bundle install
yarn install
bundle exec rake db:create
bundle exec rake db:migrate
bundle exec rake db:seed
```
In separate terminal tabs run:
```
rails server
```
```
yarn start
```
## Running the test suite
To run the test suite run the following commands in the terminal
```
yarn test
```
```
bundle exec RSpec
```
