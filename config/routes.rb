Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  get '/games', to: 'homes#index'
  get '/games/:id', to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :games, only: [:index, :show] do
        resources :reviews, only: [:index]
      end
    end
  end
end
