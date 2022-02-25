"""empty message

Revision ID: 5fddfaebc332
Revises: 9e248576d9f1
Create Date: 2022-02-24 19:17:01.094177

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5fddfaebc332'
down_revision = '9e248576d9f1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('messages_receiver_id_fkey', 'messages', type_='foreignkey')
    op.create_foreign_key(None, 'messages', 'images', ['receiver_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'messages', type_='foreignkey')
    op.create_foreign_key('messages_receiver_id_fkey', 'messages', 'users', ['receiver_id'], ['id'])
    # ### end Alembic commands ###