class LocationsController < ApplicationController

	def index
    @locations = Location.order(updated_at: :desc)
  end

  def new
    @location = Location.new
  end

  def create
    @location = Location.new(address: params[:address], user_id: current_user.id)
      if @location.save
        redirect_to user_location_path(current_user, @location)
      else
        redirect_to :back
      end
  end

  def show
    @location = Location.find(params[:id])
  end

  private
  def get_params
    params.require(:location).permit(:address).merge(user: current_user)
  end
end
