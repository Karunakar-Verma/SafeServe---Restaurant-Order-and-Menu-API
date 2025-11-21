import Menu from "../Models/MenuModel.js";

export const createMenu = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required!" });
    }
    const img_url = req.file ? req.file.filename : null;
    const newMenu = await Menu.create({
      name,
      description,
      price,
      category,
      img_url,
    });

    return res.status(201).json({
      message: "Menu created successfully!",
      menu: newMenu,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getMenu = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    return res.status(200).json(menus);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const id = req.params.id; // fixed
    const { name, price, description, category } = req.body;

    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res.status(404).json({ message: "Not found !" });
    }

    await Menu.update(
      { name, price, description, category },
      { where: { id } } // specify which record to update
    );

    const updatedMenu = await Menu.findByPk(id);
    res.status(200).json(updatedMenu);

  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const deleteMenu = async (req, res) => {
  try {
    const id = req.params.id;

    const toDel = await Menu.findByPk(id);
    if (!toDel) {
      return res.status(404).json({ message: "Not Found!" });
    }

    await Menu.destroy({ where: { id } }); 

    res.status(200).json({ message: "Deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// export const uploadImage = () => {
//   console.log("uploadImage");
// };
