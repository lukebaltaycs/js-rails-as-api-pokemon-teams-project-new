Rails.application.routes.draw do
  resources :pokemons
  resources :trainers
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get '/trainers/:id/newpoke', to: 'trainers#newpoke'


end
