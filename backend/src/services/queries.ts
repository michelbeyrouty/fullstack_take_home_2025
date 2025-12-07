// Work Orders Queries

export const INSERT_WORK_ORDER_QUERY = `
        INSERT INTO work_orders (name)
        VALUES (?)
        RETURNING id
`;

export const INSERT_WORK_ORDER_ASSIGNEE_QUERY = `
        INSERT INTO work_order_assignees (work_order_id, user_id)
        VALUES (?, ?)
`;

export const LIST_WORK_ORDERS_QUERY = `
        SELECT id, name, status
        FROM work_orders
        ORDER BY CASE WHEN status = 'OPEN' THEN 0 ELSE 1 END, id;
  `;

export const GET_WORK_ORDER_WITH_USERS_QUERY = `
        SELECT
          wo.id,
          wo.name,
          wo.status,
          COALESCE('[' || GROUP_CONCAT(
              '{' ||
              '"id": ' || u.id || ', ' ||
              '"name": "' || u.name || '", ' ||
              '"email": "' || u.email || '"' ||
              '}'
          ) || ']', '[]') AS assignees
        FROM work_orders wo
        LEFT JOIN work_order_assignees woa ON wo.id = woa.work_order_id
        LEFT JOIN users u ON woa.user_id = u.id
        WHERE wo.id = ?
        GROUP BY wo.id;
  `;

export const UPDATE_WORK_ORDER_STATUS_QUERY = `
        UPDATE work_orders
        SET status = CASE
            WHEN status = 'OPEN' THEN 'CLOSED'
            WHEN status = 'CLOSED' THEN 'OPEN'
            ELSE status
        END
        WHERE id = ?
    `;

export const DELETE_WORK_ORDER_QUERY = `
        DELETE FROM work_orders
        WHERE id = ?
`;

// Work Order Assignees Queries

export const DELETE_WORK_ORDER_ASSIGNEES_QUERY = `
        DELETE FROM work_order_assignees
        WHERE work_order_id = ?
`;

// Users Queries

export const LIST_USERS_QUERY = `
        SELECT id, name, email
        FROM users;
  `;

export const LIST_INACTIVE_USERS_QUERY = `
        SELECT id, name, email
        FROM users
        WHERE id NOT IN ( SELECT DISTINCT user_id FROM work_order_assignees );
  `;

export const GET_USERS_BY_IDS_QUERY = (placeholders: string) => `
        SELECT id, name, email
        FROM users
        WHERE id IN (${placeholders})
`;
