class HomepageController < ApplicationController
  def index
    @welcome_message = 'Welcome to you!'
    @based_tree = [3,6,2,78,24,1]
    tree = TreeHandler::Tree.new(@based_tree)
    tree.rebalance!
    @tree = tree.level_order.flatten
  end
end
