import Order from "../Models/OrderModel.js";
import OrderItem from "../Models/OrderItem.js";
import Menu from "../Models/MenuModel.js";

export const createOrder = async (req, res) => {
  try {
    const { user_id, items } = req.body;

    if (!user_id || !items || items.length === 0) {
      return res.status(400).json({ message: "user_id and items required" });
    }

    //  Calculate total based on items
    let total = 0;

    for (const item of items) {
      const menuData = await Menu.findByPk(item.menu_id);
      if (!menuData) {
        return res.status(404).json({ message: `Menu item ${item.menu_id} not found` });
      }

      total += menuData.price * item.quantity;
    }

    //  Create order entry
    const newOrder = await Order.create({
      user_id,
      status: "pending",
      total,
    });

    // Insert order items
    for (const item of items) {
      await OrderItem.create({
        order_id: newOrder.id,
        menu_id: item.menu_id,
        quantity: item.quantity,
      });
    }

    return res.status(201).json({
      message: "Order created successfully",
      order_id: newOrder.id,
      total,
    });

  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};


export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order fetched successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findOne({ where: { id } });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    return res.json({ message: "Order status updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const listOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        return res.json(orders);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};


export const deleteOrders = async (req, res) => {
  try {
    const { id } = req.params;

    await OrderItem.destroy({ where: { order_id: id } });
    await Order.destroy({ where: { id } });

    return res.json({ message: "Order Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
