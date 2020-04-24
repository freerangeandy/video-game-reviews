require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:user_name) {|n| "User#{n}" }
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end

  factory :game do
    sequence(:title) {|n| "game#{n}"}
  end
end
