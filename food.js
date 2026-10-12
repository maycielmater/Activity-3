/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */

import { Foods } from "../models/Foods.js";

const food = {
  index: async (req, res) => {
    try {
      const data = await Foods.findAll();
      res.render("home", { data });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error loading foods");
    }
  },

  edit: async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Foods.findByPk(id);

    if (!data) {
      return res.status(404).send("Food not found");
    }

    res.render("edit", { data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading food");
  }
},

  add: (req, res) => {
    res.render("add");
  },

 insert: async (req, res) => {
  try {
    const { Name, categories, brand, flavor, price, cost } = req.body;

    console.log("Form data:", req.body);

    await Foods.create({
      Name,
      categories,
      brand,
      flavor,
      price,
      cost,
    });

    res.redirect("/");
  } catch (err) {
    console.error("INSERT ERROR:", err);
    res.status(500).send("Error saving food");
  }
},
  update: async (req, res) => {
    try {
      const { id, Name, categories, brand, flavor, price, cost } = req.body;

      const data = await Foods.findByPk(id);

      if (!data) {
        return res.status(404).send("Food not found");
      }

      await data.update({
        Name,
        categories,
        brand,
        flavor,
        price,
        cost,
      });

      res.redirect("/");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating food");
    }
  },
};

export { food };