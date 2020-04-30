class Api::V1::ReviewsController < ApplicationController
  before_action :authorize_user, except: [:index, :show, :create]

  def index
  end

  def create
    review = Review.new(reviews_params)

    if review.save
      render json: review
    else
      render json: {error: review.errors.full_messages.to_sentence}
    end
  end

  protected

  def reviews_params
    params.require(:review).permit(:rating, :comment, :game_id)
  end

  def authorize_user
    if !user_signed_in || !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end
end
