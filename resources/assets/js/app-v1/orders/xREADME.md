# Orders module
Orders have three main states: "Quote", "Active", "Archived"
A project can be created for any order during initial order creation.
A project can also be created for an existing order with no active project.

### Creation
While creating a new order, there will be a fluent and obvious creation of an attached project as well.
The interface should reflect the simplicity of it, and be available on the same page without redirections and 
button pushes.

See draft sketches of design in ./DESIGN

## Milestones
- [ ] Orders
  - [ ] Updating order status inline
    - [ ] Filter orders by status
  - [ ] Editing existing orders in order detail view (all properties except ID and CODE)
  - [ ] Adding product lines dynamically
    - [ ] Freetext line
    - [ ] Database line
- [ ] Projects
  - [ ] Creating and attaching project on order
  - [ ] Adding tasks to project
    - [ ] Assigning task to user
    - [ ] Updating task status
