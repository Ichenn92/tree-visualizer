class HomepageController < ApplicationController
  def index
    @welcome_message = "Welcome to you!"
  end
end