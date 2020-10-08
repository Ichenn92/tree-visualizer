class HomepageController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
  end

  def run
    render json: eval(params[:code])
  end
end
