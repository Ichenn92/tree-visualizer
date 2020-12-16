Rails.application.routes.draw do
  root 'homepage#index'
  get '/learn', to: 'homepage#learn'
  post '/run', to: 'homepage#run'
end
