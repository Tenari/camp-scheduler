Rails.application.routes.draw do
  root 'main#index'
  get 'counselor_print', to: 'main#counselor_print' 
end
