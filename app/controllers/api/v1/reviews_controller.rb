class Api::V1::ReviewsController < ApplicationController
  before_action :authorize_user, except: [:index, :show, :create]

  def index
  end

  def create
    review = Review.new(reviews_params)
    review.user = current_user

    if review.save
      render json: review
    else
      render json: {error: review.errors.full_messages.to_sentence}
    end
  end

  def destroy
    if current_user.reviews.exists?(params[:id])
      review = Review.find(params[:id])
      game = review.game
      review.delete
      render json: game
    end
  end

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

  private

  def reviews_params
    params.require(:review).permit(:rating, :comment, :game_id, :user_id)
  end

  def authorize_user
    if !user_signed_in || !current_user.admin?
      render json: {error: "Not available"}
    end
  end
end
