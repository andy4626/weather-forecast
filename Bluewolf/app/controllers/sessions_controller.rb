class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to new_user_location_path(user.id)
    else
      flash.now.alert = 'Incorrect Username or password'
      render :new
    end
  end

  def destroy
    session.clear
    redirect_to root_path
  end

end