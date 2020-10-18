class TreesApi < TreeHandler::Tree
  
  def initialize array
    super
    @based_value = @data.dup
    @tree = { values: @based_value, actions: [] }
  end

  def insert value
    super
    @tree[:actions] << {action: "add", value: value}
  end

  def delete value
    super
    @tree[:actions] << {action: "delete", value: value}
  end

  def rebalance!
    super
    @tree[:actions] << {action: "rebalance!"}
  end

  def run
    @tree
  end
end

