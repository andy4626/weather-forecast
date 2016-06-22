class User < ActiveRecord::Base
	attr_accessor :username, :password
  has_many :locations
  has_many :weather
  validates :username, presence: true, uniqueness: true
  has_secure_password
end
