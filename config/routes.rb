Rails.application.routes.draw do
  root 'homepage#index'
  post '/run', to: 'homepage#run'
end
