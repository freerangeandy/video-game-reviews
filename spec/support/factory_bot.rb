require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:user_name) {|n| "User#{n}" }
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end

  factory :game do
    sequence(:title) {|n| "title#{n}"}
    sequence(:image) {|n| "image#{n}"}
    sequence(:description) {|n| "description#{n}"}
    sequence(:creator) {|n| "creator#{n}"}
    sequence(:platform) {|n| "platform#{n}"}
    sequence(:genre) {|n| "genre#{n}"}
    sequence(:site) {|n| "site#{n}"}
    sequence(:release_date) {|n| "release_date#{n}"}
  end
end
