class TreesApi < TreeHandler::Tree
  
  def initialize array
    super
    @tree = []
  end

  def insert value
    super
    @tree << {method: "add", value: value}
  end

  def delete value
    super
    @tree << {method: "delete", value: value}
  end

  def rebalance!
    super
    @tree << {method: "rebalance!"}
  end
end

