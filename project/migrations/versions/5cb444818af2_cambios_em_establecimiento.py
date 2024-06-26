"""cambios em establecimiento

Revision ID: 5cb444818af2
Revises: 25db646263b6
Create Date: 2024-06-26 17:13:50.714460

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5cb444818af2'
down_revision = '25db646263b6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('establecimientos', 'descripcion',
               existing_type=sa.TEXT(),
               type_=sa.String(length=500),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('establecimientos', 'descripcion',
               existing_type=sa.String(length=500),
               type_=sa.TEXT(),
               existing_nullable=True)
    # ### end Alembic commands ###